export class BasicFile {
    private name: string
    private createdAt: Date
    private editedAt: Date

    constructor(name: string) {
        this.name = name
        this.createdAt = new Date()
        this.editedAt = new Date()
    }

    /**
     * update
     */
    public update() {
        throw new Error("to implement");
    }

    public get getName(): string {
        return this.name
    }

}


export class MyFile extends BasicFile {
    // private name: string
    private data: string
    constructor(name: string, data: string = '') {
        super(name)
        this.data = data
    }

    public cat() {
        console.log(this.data);
    }
}


export class MyFolder extends BasicFile {
    private childrens: BasicFile[]

    constructor(name: string) {
        super(name)
        this.childrens = []
    }

    public ls() {
        console.log('start ls 1');

        this.childrens.forEach(child => {
            console.log(child?.getName);
        })
    }

    /**
     * addChild
     */
    public addChild(child: BasicFile) {
        this.childrens.push(child)
    }
}



abstract class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    display(): void {
        console.log(this.name);
    }

    find() {
        console.log(33);

    };
}

class Employee extends Person {
    empCode: number;

    constructor(name: string, code: number) {
        super(name); // must call super()
        this.empCode = code;
    }

    find() {
        // execute AJAX request to find an employee from a db
        console.log(55);

    }
}

let emp: Person = new Employee("James", 100);
emp.display(); //James

let emp2 = emp.find();

export class CheckSingleton {
    private static rootDirectory: MyFolder | null = null;

    private constructor() { } // Prevent direct instantiation

    public static getRoot(name: string = 'root'): MyFolder {
        if (!CheckSingleton.rootDirectory) {
            CheckSingleton.rootDirectory = new MyFolder(name);
        }
        return CheckSingleton.rootDirectory;
    }
}

const aRoot = CheckSingleton.getRoot('aRoot');
const bRoot = CheckSingleton.getRoot('bRoot');

console.log(aRoot === bRoot); // true