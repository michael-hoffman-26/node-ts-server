import { MyFile, MyFolder } from "./source/File-system2"

const root = new MyFolder('root')
root.ls()
const fileExample = new MyFile('CV', "michael")
root.addChild(fileExample)
root.addChild(fileExample)
root.ls()