# Simple consistent-hashing

Balance values with mutiple hosts.

### Add host
```node
    const consistent = new Consistent();
    consistent.addHost(new HashRing("192.168.1.0"));
    consistent.addHost(new HashRing("192.168.1.1"));
```
### Remove host
```node
    consistent.removeHost(new HashRing("192.168.1.0"));
```

### Add
```node
    consistent.add("foo");
    consistent.add("bar");
```

### Remove
```node
    consistent.remove();
```

### Get nodes
```node
    console.log(consistent.nodes);
    /*
        [
            {
                _host: "192.168.1.0",
                _values: ["foo", "bar"]
            }
        ]
    */
```