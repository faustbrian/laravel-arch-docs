# Action Redirect

::: info
This page will describe how [redirects](https://laravel.com/docs/10.x/redirects#redirecting-controller-actions) can be used in a controller.
:::

## Examples

```yaml
arch: 1.0.0
definitions:
  controllers:
    web:
      User:
        methods:
          index:
            - redirect: PostController show with:post
```
