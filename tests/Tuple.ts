import { branch } from '../src/Tuple';

describe("Tuple", () => {
    describe("branch", () => {
        it("converts value to tuple", () => {
            expect(branch(1)).toEqual([1,1])
        })
    })
})
