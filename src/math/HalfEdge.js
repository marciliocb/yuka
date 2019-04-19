import { Vector3 } from './Vector3.js';

/**
* Implementation of a half-edge data structure, also known as
* {@link https://en.wikipedia.org/wiki/Doubly_connected_edge_list Doubly connected edge list}.
*
* @author {@link https://github.com/Mugen87|Mugen87}
*/
class HalfEdge {

	/**
	* Constructs a new half-edge.
	*
	* @param {Vector3} vertex - The (origin) vertex of this half-edge.
	*/
	constructor( vertex = new Vector3() ) {

		/**
		* The (origin) vertex of this half-edge.
		* @type Vector3
		*/
		this.vertex = vertex;

		/**
		* A reference to the next half-edge.
		* @type HalfEdge
		*/
		this.next = null;

		/**
		* A reference to the previous half-edge.
		* @type HalfEdge
		*/
		this.prev = null;

		/**
		* A reference to the opponent half-edge.
		* @type HalfEdge
		*/
		this.twin = null;

		/**
		* A reference to its polygon/face.
		* @type Polygon
		*/
		this.polygon = null;

	}

	/**
	* Returns the origin vertex of this half-edge.
	*
	* @return {Vector3} The origin vertex.
	*/
	from() {

		return this.vertex;

	}

	/**
	* Returns the destination vertex of this half-edge.
	*
	* @return {Vector3} The destination vertex.
	*/
	to() {

		return this.next ? this.next.vertex : null;

	}

	/**
	* Computes the length of this half-edge.
	*
	* @return {Number} The length of this half-edge.
	*/
	length() {

		const from = this.from();
		const to = this.to();

		if ( to !== null ) {

			return from.distanceTo( to );

		}

		return - 1;

	}

	/**
	* Computes the squared length of this half-edge.
	*
	* @return {Number} The squared length of this half-edge.
	*/
	squaredLength() {

		const from = this.from();
		const to = this.to();

		if ( to !== null ) {

			return from.squaredDistanceTo( to );

		}

		return - 1;

	}

	/**
	* Links the given opponent half edge with this one.
	*
	* @param {HalfEdge} edge - The opponent edge to link.
	* @return {HalfEdge} A reference to this half edge.
	*/
	linkOpponent( edge ) {

		this.twin = edge;
		edge.twin = this;

		return this;

	}

	/**
	* Computes the direction of this half edge. The method assumes the half edge
	* has a valid reference to a next half edge.
	*
	* @param {Vector3} result - The result vector.
	* @return {Vector3} The result vector.
	*/
	getDirection( result ) {

		return result.subVectors( this.next.vertex, this.vertex ).normalize();

	}

}

export { HalfEdge };
