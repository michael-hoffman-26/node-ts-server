

export interface IResourceMetaData {
    name: string
    type: string
    role: string
}

export interface IBinding {
    role: string;
    members: string[];
}

export interface IResource {
    name: string;
    asset_type: string;
    iam_policy: {
        etag: string;
        bindings: IBinding[];
    };
    ancestors: string[];
}
