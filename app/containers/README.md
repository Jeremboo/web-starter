
See [Container - Component pattern](https://medium.com/@learnreact/container-components-c0e67432e005#.riynoq0lv)

"Lets pull out data-fetching into a container."

```
AContainer/
  - index.js
  - index.spec.js
  - modules/
    - actions.js
    - actions.spec.js
    - middlewares.js
    - middlewares.spec.js
    - reducers.js
    - reducers.spec.js
  - components/
    - component1/
      - index.js
      - index.spec.js
      - index.styl
    - ...
    ```
