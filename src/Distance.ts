import * as Eq from 'fp-ts/Eq';
import * as Ord from 'fp-ts/Ord';
import * as n from 'fp-ts/number';
import { pipe } from 'fp-ts/function';


/*
 * The absolute distance between two values.
 */
interface Distance<_> {
    distance: (a: _, b: _) => number;
}

/*
 * A distance of zero should imply that they are equal.
 */
export const toEq = <_>(d: Distance<_>): Eq.Eq<_> => ({
    equals: (a, b) => d.distance(a,b) === 0
})

/*
 * Ordering using distance to a center element.
 */
export const toOrd = <_>(d: Distance<_>) => (center: _) => pipe(
    n.Ord,
    Ord.contramap<number, _>(x => d.distance(center, x))
)

/*
 * Utils
 */

export const trivial: Distance<unknown> = ({
    distance: () => 0
})

export const numericDistance: Distance<number> = ({
    distance: (a, b) => Math.abs(b - a)
})

/*
 * The closer of two elements to a center point
 * If they are considered equal, the first argument is chosen
 */
export const closest = <_>(d: Distance<_>) => (center: _) => pipe(
    toOrd(d)(center),
    Ord.min
)

/*
 * Tests whether an element is within a given radius of a center point.
 *
 * @example
 * withinRadius(numericDistance)(0, 1)(0.5) // True
 * withinRadius(numericDistance)(0, 1)(1.5) // False
 */
export const withinRadius = <_>(d: Distance<_>) => (center: _, radius: number) => (el: _) =>
    d.distance(center, el) <= radius
