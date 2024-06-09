console.log('Hello World')


export interface Item {
    name: string
    price: number
}

const AllItems = new Map<string, Item>
AllItems.set('bamba', {name: 'bamba', price: 2})

export interface Discount {
    condition: string
    action: string
}

const AllDiscounts = new Map<string, Discount>
AllDiscounts.set('bamba', {
    condition: 'have3Bamba',
    action: 'AddOneForDree'
})

class Kupa {
    private total: number
    private itemsLists: Map<string, number> // bamba -> 2
    private discounts: unknown[]
    constructor() {
        this.total = 0
        this.itemsLists = new Map<string, number>()
        this.discounts = []
    }


    get get_total(){
        return this.total
    }

     public addItem(item: string){
        const currrentCount = this.itemsLists.get(item)

        if (currrentCount){
            this.itemsLists.set(item, currrentCount + 1)
        } else {
            this.itemsLists.set(item, 1)
        }
        this.total +=  AllItems.get(item)?.price || 0
         this.doDiscount(item)
     }

     private doDiscount(item: string){
         const discount = AllDiscounts.get(item)
         if (discount?.condition()){
             discount?.action()
         }
     }
}