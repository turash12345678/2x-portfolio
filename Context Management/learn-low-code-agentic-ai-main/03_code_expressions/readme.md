# Code and Expressions

[Code in n8n#](https://docs.n8n.io/code/)

[Expressions](https://docs.n8n.io/code/expressions/)

[Check incoming data](https://docs.n8n.io/code/cookbook/expressions/check-incoming-data/)

## Mini-Guide to n8n Expressions

Here’s a concise, practical mini-guide to n8n expressions.

# 1) What’s an expression?

Expressions let you embed JavaScript inside parameters with `{{ ... }}` so values can be dynamic.

```text
Hello {{ $json.firstName }}!
```

# 2) Your core data: `$json` (current item)

`$json` is the payload of the current item flowing through the node.

```text
Order ID: {{ $json.orderId }}
Customer: {{ $json.user.name }}
```

# 3) Strings + math

Concatenate strings and perform arithmetic directly in expressions.

```text
{{ $json.firstName + ' ' + $json.lastName }}
{{ $json.price * $json.quantity }}
```

# 4) Conditionals (ternary)

Use JavaScript’s `? :` to choose between values.

```text
{{ $json.total > 100 ? 'VIP' : 'Regular' }}
```

# 5) Use data from other nodes with `$node`

Reference fields from prior nodes by name.

```text
{{ $node["HTTP Request"].json.data.id }}
{{ $node["Set"].json.message }}
```

# 6) Multiple items: `$items()` and indexing

Access specific items when a node returns multiple results.

```text
{{ $items("HTTP Request")[0].json.title }}
{{ $items("Merge")[1].json.user.email }}
```

# 7) Arrays & objects (map, filter, join)

Apply standard JavaScript array/object methods for transformation.

```text
{{ ($json.tags || []).map(t => t.toUpperCase()).join(', ') }}
{{ Object.keys($json).join('|') }}
```

# 8) Dates & formatting

Work with `Date` and format as needed.

```text
{{ (new Date()).toISOString() }}
{{ new Date($json.createdAt).toLocaleDateString() }}
```

# 9) Safe defaults & guards

Handle missing fields with optional chaining and defaults.

```text
{{ $json.user?.email || 'unknown@example.com' }}
{{ ($json.items || []).length }}
```

# 10) Where to use expressions

Use expressions in any parameter that supports them—subjects, URLs, request bodies, and more.

---

## Quick cheat sheet

```text
// Current item
{{ $json.foo }}

// Other node
{{ $node["Node Name"].json.bar }}

// Combine text + values
{{ `Hello ${$json.first} ${$json.last}` }}

// Conditional
{{ $json.total > 50 ? 'High' : 'Low' }}

// Arrays
{{ ($json.list || []).filter(x => x.active).length }}

// Date
{{ (new Date($json.timestamp)).toISOString() }}
```
