
# voxcss

VoxCss fue pensando inicialmente como un framework para usar Material Design en su sitio web. 
VoxCss se subdivide en los siguientes submódulos:

* core-style
* core-elements


Para compilar voxcss debe instalar [vox-webcompiler](https://github.com/voxsoftware/vox-webcompiler)



### core-style

Core-style es un conjunto de estilos y fuentes para usar Material Design en su sitio web. Fue basado en [Materialize](http://materializecss.com/) pero con un enfoque a utilizar toda la paleta de colores de material design de manera más fácil

#### Compilación

```sh
> $ cd voxcss
> $ vwc -compile core-style.js
```

El directorio predeterminado de salida es voxcss/dist. Puede especificar un directorio de salida diferente:

```sh
> $ cd voxcss
> $ vwc -compile --out-dir path core-style.js
```

Puede compilar la versión minificada

```sh
> $ cd voxcss
> $ vwc -compile core-style.js -min
```



### core-elements

Core-elements es el complemento de core-style. Contiene el javascript necesario de los componentes de voxcss

#### Compilación

```sh
> $ cd voxcss
> $ vwc -compile core-elements.js
```

El directorio predeterminado de salida es voxcss/dist. Puede especificar un directorio de salida diferente:

```sh
> $ cd voxcss
> $ vwc -compile --out-dir path core-elements.js
```

Puede compilar la versión minificada

```sh
> $ cd voxcss
> $ vwc -compile core-elements.js -min
```


### Instrucciones de compilación

Para compilar un módulo específico puede ver la sección de *Compilación* dentro de core-style y core-elements. Para compilar completo:

```sh
> $ cd voxcss
> $ vwc -compile
```

O la versión minificada: 

```sh
> $ cd voxcss
> $ vwc -compile -min
```

**NOTA**: Al compilar completo voxcss, también se añade al directorio de salida core-basic y core, módulos base de vox-webcompiler