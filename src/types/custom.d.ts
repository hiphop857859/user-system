export { }

declare global {
    // eslint-disable-next-line no-unused-vars
    namespace NodeJS {
        // eslint-disable-next-line no-unused-vars
        interface Global {
            io: any
        }
    }
}
