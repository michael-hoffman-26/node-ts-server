export interface FileSystemInterface {
    // function to print all content of directory
    ls(options: unknown): void
    delete(name: string): void
    addFileOrFolder(sun: FileP | DirectoryP): void
}

export interface FileSystemMetaData {
    name: string
    dateCreated: Date
    lastModified: Date
    owner: string
}

class FileP {
    #checkFiled: unknown
    constructor(private metaData: FileSystemMetaData, private data: unknown) {
        this.metaData = metaData
        this.data = data
        this.#checkFiled = 499
    }

    get name() {
        return this.metaData.name
    }
}

class DirectoryP implements FileSystemInterface{
    #files: FileP[]
    #directories: DirectoryP[]

    constructor(private metaData: FileSystemMetaData) {
        this.metaData = metaData
        this.#files = []
        this.#directories = []
    }

    addFileOrFolder(sun: FileP | DirectoryP) {
        if (sun instanceof FileP){
            this.#files.push(sun)
        } else {
            this.#directories.push(sun)
        }
    }

    delete(name: string) {
        const fileIndex = this.#files.findIndex((file => file.name === name))
        const isFileExits = fileIndex !== -1
        if (isFileExits) {
            this.#files.splice(fileIndex, 1)
            return
        }
        const directoryIndex = this.#directories.findIndex((directory => directory.name === name))
        const isDirectoryExist = directoryIndex !== -1
        if (isDirectoryExist) {
            this.#directories.splice(directoryIndex, 1)
            return
        }
        // Dont so nothing.maf_env_groupreset
    }

    get name() {
        return this.metaData.name
    }
    ls(options: unknown) {
    }
}