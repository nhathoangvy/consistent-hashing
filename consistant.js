class HashRing {

    constructor(host = "", values = []) {
        this._host = host;
        this._values = values;
    }

    get host() {
        return this._host;
    }

    set host(val) {
        this._host = val;
    }

    get values() {
        return this._values;
    }

    set values(val) {
        this._values = val;
    }

}

class Consistent extends HashRing {

    constructor(nodes = []){
        super();
        this._nodes = nodes
    }

    get nodes() {
        return this._nodes;
    }

    set nodes(val) {
        this._nodes = val;
    }

    addHost(cls) {
        this._nodes.push(cls);
        let removed = this.remove();
        if (typeof removed != "undefined") {
            let stop = true;
            this.add(removed);
            while (stop)
            {   
                this.add(this.remove());
                if (this.isHostBalance()) stop = false;
            };
        }
        return;
    }

    isHostBalance() {
        if (this.nodes.length == 1) return true;
        const min = this.min;
        for (var i = 0; i < this.nodes.length; i++) {
            console.log({
                currIdx: i,
                minIdx: min,
                min: this.nodes[min].values.length, 
                curr: this.nodes[i].values.length
            })
            if (i != min && ( this.nodes[i].values.length - 1 == this.nodes[min].values.length || this.nodes[i].values.length == this.nodes[min].values.length ) ) {
                return true;
            }
        }
        return false;
    }

    removeHost(cls) {
        for (var i = 0; i < this.nodes.length; i++) if (cls.host == this.nodes[i].host) {
            const removedNode = this.nodes[i];
            this.nodes.splice(i, 1);
            for (var j = 0; j < removedNode.values.length; j++) this.add(removedNode.values[j]);
        };
    }

    add(val) {
        this.nodes[this.min].values.push(val);
    }

    get min() {
        const ring = this.nodes;
        let minimum = 0;
        for (var i = 0; i < ring.length; i++) if ( ring[minimum].values.length > ring[i].values.length ) minimum = i;
        return minimum;
    }

    remove() {
        const index = this.nodes[this.max].values.length - 1;
        const indexValue = this.nodes[this.max].values[index];
        this.nodes[this.max].values.splice(index, 1);
        return indexValue;
    }

    get max() {
        const ring = this.nodes;
        let maximum = 0;
        for (var i = 0; i < ring.length; i++) if ( ring[maximum].values.length < ring[i].values.length ) maximum = i;
        return maximum;
    }

}

module.exports = {
    HashRing,
    Consistent
}