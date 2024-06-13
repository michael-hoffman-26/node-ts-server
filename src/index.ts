console.log('Hello World')


export interface Item {
    name: string
    price: number
}

const AllItems = new Map<string, Item>
AllItems.set('Bamba', {name: 'Bamba', price: 2})
AllItems.set('Bread', {name: 'Bread', price: 12})

export interface Discount {
    doDiscount: (itemsNum: number) => number,
    undoDiscount?: (itemsNum: number) => number,
}

const AllDiscounts = new Map<string, Discount>
AllDiscounts.set('Bread', {
    doDiscount: (itemsNum) => {
        if (itemsNum > 0){
            const isEven = itemsNum % 2
            if (isEven === 0){
                return -4
            }
        }
        return 0
    },
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
         if (discount){
             const discountAmount = discount.doDiscount(this.itemsLists.get(item) || 0)
             this.total = this.total + discountAmount
         }
     }
}


const kupa = new Kupa()
kupa.addItem('Bread')
kupa.addItem('Bread')
kupa.addItem('Bread')
kupa.addItem('Bread')
kupa.addItem('Bamba')
console.log(kupa.get_total)