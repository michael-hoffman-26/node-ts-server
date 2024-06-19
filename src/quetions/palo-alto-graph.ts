// import {find} from "async";
//
// interface Finiding {
//     attr1: string
//     type: string
//     firstSeen: Date
//     id: number
// }
//
// interface Report{
//     repoId: number
//     findings: Finiding[]
// }
//
//
// class ReportManager {
//     /**
//      * repoId => {
//      *          findingId => {
//      *              findingData.
//      *          }
//      *          findType => {
//      *              findIds
//      *          }
//      * }
//      *
//      *
//      * */
//     private reportMap: Map<number, {
//         findingId: Map<number, Finiding>,
//         findType: Map<string, number[]>
//     }> = new Map()
//     constructor() {
//         this.reportMap = new Map<number, {findingId: Map<number, Finiding>; findType: Map<string, number>}>()
//     }
//
//
//     public handleReport(report: Report){
//         const { repoId, findings } = report
//         const getRepo = this.reportMap.get(repoId)
//         if (getRepo) {
//             // do update.
//             // going over all the findings
//             /**
//              * if its new. add him.
//              * if its update, bc it already exsits do update to the finding
//              * */
//
//         } else {
//             const findType = this.getFindingTypes(findings)
//             // const findingId = this.getFinidngIds(findings) // todo handle firstSeen
//
//             // this.reportMap.set(repoId, {
//             //     findingId,
//             //     findType
//             // })
//         }
//     }
//
//     private getFindingTypes(findings: Finiding[]): Map<string, number> {
//         return findings.reduce((allTypes: Map<string, number>, finding: Finiding) => {
//             const { type,  id} = finding
//
//
//
//         }, new Map())
//     }
//
//     public getReport(repoId: number, findType: string): unknown{
//         const repo = this.reportMap.get(repoId)
//         const allFindingIds =
//
//     }
// }