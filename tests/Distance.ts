import { closest, numericDistance, withinRadius, toEq } from '../src/Distance';

describe("Distance", () =>{
    describe("closest", () => {
        it("returns closest value", () => {
            const closestToFive = closest(numericDistance)(5);
            expect(closestToFive(1, 6)).toBe(6)
            expect(closestToFive(1, 10)).toBe(1)
        })

        it("returns first value if distances are equal", () => {
            const closestToFive = closest(numericDistance)(5);
            expect(closestToFive(4, 6)).toBe(4)
            expect(closestToFive(6, 4)).toBe(6)
        })
    })

    describe("withinRadius", () => {
        it("returns true if value within radius", () => {
            const closeTo2 = withinRadius(numericDistance)(2, 1);
            expect(closeTo2(0)).toBe(false)
            expect(closeTo2(1)).toBe(true)
            expect(closeTo2(3)).toBe(true)
            expect(closeTo2(5)).toBe(false)
        })
    })

    describe("toEq", () => {
        it("equals returns true only if values are actually equal", () => {
            const eq = toEq(numericDistance).equals;
            expect(eq(5, 5)).toBe(true)
            expect(eq(1, 2)).toBe(false)
            expect(eq(2, 1)).toBe(false)
        })
    })

})
