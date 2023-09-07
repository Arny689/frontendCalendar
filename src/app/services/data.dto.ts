export interface DataDto {
    readonly year: number
    readonly month: number
    readonly day: number
    readonly name: string
    readonly description: string
    readonly explanation: string
}

export interface DateParsed {
    readonly year: number
    readonly month: number
    readonly day: number
}