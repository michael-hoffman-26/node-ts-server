import {IResourceMetaData} from "./types";

export class NodeA {
    private id: string;
    private name: string;
    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    get getId () {
        return this.id
    }

    get getName () {
        return this.name
    }

}

export class Identity extends NodeA {
    constructor(id: string, name: string) {
        super(id, name); // Call the constructor of the superclass with the required arguments
    }
}

class Queue<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    enqueue(element: T): void {
        this.items.push(element);
    }

    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.shift();
    }

    front(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[0];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    print(): void {
        console.log(this.items);
    }
}

export class Resource extends NodeA {
    type: string
    constructor(id: string, name: string, type: string) {
        super(id, name);
        this.type = type
    }

    get getType (){
        return this.type
    }

}

// todo: better to implement with inheritance
export class Edge {
    private target: string;
    private source: string;
    private type: string;
    private metadata: unknown;
    constructor(source: string, target: string, type: string, metadata: unknown = undefined) {
        this.source = source;
        this.target = target;
        this.type = type; // todo: better to implement with inheritance
        this.metadata = metadata;
    }

    get getTarget() {
        return this.target
    }

    get getMetadata() {
        return this.metadata
    }
}

class Graph {
    Nodes: Map<string, NodeA> ;
    // type: <key/source, set of targets>
    Edges: Map<string, Map<string, Edge[]>>;
    // Edge: Map<>
    // Map<sourceId: <typeId, <Map<target, Edge>>>
    /**
     * TODO:
     * Instead of array of Edge, it should be a unique collection of edges, without duplicate instances
     * */

    constructor(Nodes: Map<string, NodeA>, edges: Map<string, Map<string, Edge[]>>, client: unknown) {
        this.Nodes = Nodes;
        this.Edges = edges;
    }

    getAllNodes(): Map<string, NodeA> {
        return this.Nodes;
    }

    getNodeAById(id: string): NodeA | undefined {
        return this.Nodes.get(id)
        return this.client.GetNode(id)
    }

    getEdgeById(id: string) {
        return this.Edges.get(id)
    }

    addNodeA(NodeA: NodeA): void {
        this.Nodes.set(NodeA.getId, NodeA);
    }

    addNodeAIfDosntExists(NodeA: NodeA): void {
        if (!this.Nodes.has(NodeA.getId)) {
            this.Nodes.set(NodeA.getId, NodeA);
        }
    }

    addEdge(sourceId: string, targetId: string, type: string, metadata: unknown = undefined) {
        const sourceNode = this.Nodes.get(sourceId);
        const targetNode = this.Nodes.get(targetId);

        if (!sourceNode || !targetNode) {
            console.error("Source or target node not found.");
            return;
        }

        const edge = new Edge(sourceId, targetId, type, metadata);

        if (!this.Edges.has(type)) {
            this.Edges.set(type, new Map<string, Edge[]>());
        }

        const typeMap = this.Edges.get(type);

        if (!typeMap?.has(sourceId)) {
            typeMap?.set(sourceId, []);
        }

        // Add the edge to the inner map
        typeMap?.get(sourceId)!.push(edge);

        /**
         * TODO:
         * Instead of array of Edge, it should be a unique collection of edges, without duplicate instances
         * */
    }

    getNodeEdges(nodeId: string): Edge[]{

    }

    getEdgesByTypeAndSource(type: string, sourceId: string): Edge[] {
        const typeMap = this.Edges.get(type);
        if (!typeMap || !typeMap.has(sourceId)) {
            return [];
        }
        return typeMap.get(sourceId)!;
    }

    // removeNodeAById(id: string): void {
    // todo
    // }
}

export class IdentityGraph extends Graph {

    constructor(Nodes: Map<string, Resource | Identity>, edges: Map<string, Map<string, Edge[]>>) {
        super(Nodes, edges)
    }

    getResourceHierarchy (id: string) {
        const result: string[] = []
        let parentEdges = this.getEdgesByTypeAndSource('ResourceParent', id)[0]

        while (parentEdges) {
            const currentNode = <Resource>this.getNodeAById(parentEdges.getTarget)
            result.push(currentNode.getName)
            parentEdges = this.getEdgesByTypeAndSource('ResourceParent', currentNode.getId)[0]
        }

        return result
    }

    whoHasWhat(id: string): IResourceMetaData[] {
        const results: IResourceMetaData[] = []
        const identityResources = this.getEdgesByTypeAndSource('IdentityToResource', id)

        identityResources.forEach(edge => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const roleId = edge.getMetadata?.roleId
            const allChildren = this.getAllResourceChildren(edge.getTarget)
            // console.log(role)
            allChildren.forEach(childResource =>  {
                results.push({name:childResource.getName, type: childResource.getType, role: roleId})
            })
        })

        return results
    }

    private getAllResourceChildren(id: string): Resource []{
        const rootNode = <Resource>this.getNodeAById(id)

        const visited: Resource[] = [];
        const queue = new Queue<Resource>();
        queue.enqueue(rootNode);

        while (!queue.isEmpty()) {
            const node = queue.dequeue();
            if (node) {
                visited.push(node);
                const children = this.getEdgesByTypeAndSource('ResourceChild', node.getId)
                children.forEach(child => {
                    const childNode = <Resource>this.getNodeAById(child.getTarget)
                    queue.enqueue(childNode);
                });
            }
        }

        return visited;
    }

}
