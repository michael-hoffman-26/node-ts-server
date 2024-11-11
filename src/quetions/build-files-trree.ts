// Input
const arr = [{ "process_name": "a.exe", "pid": 420, "parent_pid": 428 },
{ "process_name": "c.exe", "pid": 428, "parent_pid": -1 },
{ "process_name": "d.exe", "pid": 551, "parent_pid": 420 },
{ "process_name": "e.exe", "pid": 552, "parent_pid": 428 },
{ "process_name": "f.exe", "pid": 553, "parent_pid": -1 },
{ "process_name": "g.exe", "pid": 4, "parent_pid": 553 },
{ "process_name": "b.exe", "pid": 7, "parent_pid": 4 },
{ "process_name": "h.exe", "pid": 11, "parent_pid": 7 }]
// arrang(arr);
// output:
// c.exe
// ----a.exe
// --------d.exe
// ----e.exe
// f.exe
// ----g.exe
// --------b.exe
// ------------h.exe

interface Parent {
    process_name: string
    pid: number
    parent_pid: number
    children?: Parent[]
}

function arrang(processes): void {
    const processesMap = processes.reduce((allPro, currentPro) => {
        allPro.set(currentPro.pid, currentPro)
        return allPro
    }, new Map())

    const parentMap: Map<number, number[]> = processes.reduce((allPro, currentPro) => {
        const value: number[] = allPro.get(currentPro.parent_pid)
        if (value) {
            value.push(currentPro.pid)
            allPro.set(currentPro.parent_pid, value)
        } else {
            allPro.set(currentPro.parent_pid, [currentPro.pid])
        }
        return allPro
    }, new Map())

    console.log(parentMap);
    //{ "none": [553, 428], "428": [552, 420]}
    const PARENT_ID = -1

    const parentIds = parentMap.get(PARENT_ID) || []
    const stack: { proId: number, level: number }[] = parentIds.map((proId) => {
        return { proId, level: 0 }
    })

    while (stack.length) {
        const currentProId = stack.pop()
        const currentPro = processesMap.get(currentProId?.proId)


        printPro(currentPro?.process_name, currentProId?.level || 0)

        // add children
        const children = parentMap.get(currentProId?.proId || -1) || []

        children.forEach((childrenProId) => {
            stack.push({ proId: childrenProId, level: (currentProId?.level || 0) + 1 })
        })
    }
}



arrang(arr)

function printPro(process_name: any, level: number) {
    let append = ''
    for (let index = 0; index < level; index++) {
        append += "-----"
    }
    console.log(append + process_name);

}
