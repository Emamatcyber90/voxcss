
#### voxcss

VoxCss fue pensando inicialmente como un framework para usar Material Design en su sitio web. 
VoxCss se subdivide en los siguientes submódulos:

* core-basic
* core
* core-style
* core-elements


Para compilar voxcss se utiliza 






## core-basic

Para evitar la redundancia de código en esta carpeta se colocara un módulo donde se puedan cargar todos los módulos base de nodejs. Esto hace posible que al compilar core y core-elements no se necesite incluir nuevamente estos módulos base de nodejs

core.basic tendrá los siguientes módulos

* buffer
* path
* events
* querystring
* url
* crypto

y variables globales
* Buffer


core.http tendrá los siguientes módulos

* http


# Instrucciones de compilación

Ubíquese en la carpeta del proyecto voxcss. Ahora use los siguientes comandos

`sh`
$ cd core-basic
$ webpack
$ webpack -p
`sh`

Esto creará los archivos core-basic.js, core-http.js, core-basic.min.js y core-http.min.js dentro la carpeta dist



## core

core permite el uso de varias características de VW desde el navegador.

Las características implementadas son:

* Symbol
* Promise

** Namespace: System **
* System.Exception
* System.IEnum
* System.NotImplementedException

** Namespace: VW **
* Task
* TaskCancelledException
* Request (browser-request)

** Namespace: VW.Http **
* Request
* RequestArgs
* HttpStatusCode

** Namespace: VW.Ecma2015 **  (runtime para usar código ES6 y async/await)
* Promise
* regeneratorRuntime
* Utils


Como ya se mostró anteriormente, gracias a este módulo se puede ejecutar código ES6 y async/await de ES7 en navegadores que aún no lo soportan. Para ello debe usarse en conjunto con VW el cual permite realizar transcripción de ES6/async/await a ES5. Mírese como ejemplo core-elements 


# Instrucciones de compilación

Ubíquese en la carpeta del proyecto voxcss. Ahora use los siguientes comandos

`sh`
$ cd core
$ webpack
$ webpack -p
`sh`


Estos comandos creará el archivo vw.js y vw.min.js en la carpeta dist





