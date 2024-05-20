import {parseJsonFile} from "./parser";
import {IBinding, IResource} from "./types";
import { Identity, IdentityGraph, Resource } from "./graph";


export function makeIdentityGraph() {
    const identityGraph = new IdentityGraph(
        new Map(), new Map()
    )

    // Using absolute path, had problems with relative path
    const filePath: string = '/Users/michael_hoffman/Documents/Repos/temp/node-ts-server/src/source.json';
    const resources: IResource[] = parseJsonFile(filePath);

    resources.forEach((resource: IResource) => {
        const resourceId = resource?.ancestors?.[0]
        const resourceType: string = resource?.asset_type.split('/').pop() || ''
        const currentResource = new Resource(resourceId, resource?.name, resourceType)
        identityGraph.addNodeA(currentResource)


        resource.iam_policy?.bindings?.forEach((bind:IBinding ) => {
            const { role, members } = bind
            members?.forEach(member => {
                const currentIdentity = new Identity(member, member)
                identityGraph.addNodeAIfDosntExists(currentIdentity)
                identityGraph.addEdge(member, resourceId, 'IdentityToResource', {roleId: role})
            })
        })

        if (resource.ancestors.length >= 1) {
            for(let i = 1; i < resource.ancestors.length; i++) {
                const parentId = resource.ancestors[i]
                const childId = resource.ancestors[i -1]

                const defaultParentData = new Resource(parentId, 'unknown', 'unknown')
                identityGraph.addNodeAIfDosntExists(defaultParentData)

                identityGraph.addEdge(parentId, childId, 'ResourceChild')
                identityGraph.addEdge(childId, parentId, 'ResourceParent')
            }
        }
    });

    return identityGraph
}

const identityGraph = makeIdentityGraph()

const resourceId = 'folders/361332156337'
const identityId = 'user:ron@test.authomize.com'

console.log(`calling getResourceHierarchy, with resourceId: ${resourceId}, result: ${identityGraph.getResourceHierarchy(resourceId)}`)
console.log(`calling whoHasWhat, with Identity Id: ${resourceId}, result: ${identityGraph.whoHasWhat(identityId)}`)