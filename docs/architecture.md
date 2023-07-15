# Arquitectura de la aplicación
La aplicación está implementada con los principios de "Hexagonal Architecture", y de forma más general, de la "Clean Architecture"

## Clean Architecture
El objetivo de "Clean Architecture" es desacoplar la lógica de negocio de dependencias externas(infraestructura), como bases de datos, API REST/GraphQL, etc. y en general de tecnologías específicas. Al desacoplar la lógica de negocio de la aplicación de la infraestructura se consiguen los siguientes beneficios:

- La lógica de negocio puede ser ejecutada de forma transparente por diferentes actores y procedimientos, como la interfaz de usuario, API REST o procesos de testing
- Se puede desarrollar y probar la lógica de negocio de manera aislada de las dependencias de infraestructura o sistemas externos. Por ejemplo, desde el punto de vista de la lógica de negocio no importa si los datos se almacenan en una base de datos SQL o NoSQL
- Se puede actualizar o sustituir la infraestructura sin afectar a la lógica de negocio. Por ejemplo, la sustitución del SDK de mapa por un cambio en los precios del proveedor no tiene impacto en la funcionalidad principal

El código de la aplicación se separa en capas esféricas, ubicando la lógica de negocio en la parte central y la infraestructura en capas más externas. Se establece como regla que la dependencia entre las capas debe ir desde el exterior hacia el interior, evitando así que la lógica central tenga dependencias con la infraestructura. 

## Hexagonal Architecture
De forma más específica, la arquitectura hexagonal separa una parte de la infraestructura en entidades que utilizan la lógica de negocio y otras entidades que son utilizadas por la propia lógica central. Utiliza el patrón "Ports and Adapters" para dar forma a una implementación de estas relaciones que cumpla con el requisito de que la infraestructura sea la que dependa de la lógica central y no al revés. Define los dos tipos de puertos como interfaces:

- Puertos primarios(Driving Ports). Es un API de la aplicación de cara a las entidades externas que interactúan con ella
- Puertos secundarios(Driven Ports). Es un API de la aplicación que define la forma de interactuar con las entidades externas

Las entidades externas utilizan adaptadores, que son implementaciones de estas interfaces que dependen de la infraestructura y tecnologías concretas:

- Adaptadores primarios. Implementan puertos primarios para poder hacer uso de la lógica central
- Adaptadores secundarios. Implementan puertos secundarios para permitir a la aplicación hacer uso de funcionalidades dependientes de la infraestructura, como por ejemplo, comunicarse con un servicio por GraphQL o ejecutar funcionalidad nativa de un dispositivo móvil

## Capas

Se definen 2 capas claramente separadas por el patrón de puertos y adaptadores para delimitar la lógica core y la infraestructura. Dentro del core de la aplicación se establece una capa propia y sin dependencias llamada dominio, que está reservada para la definición de las entidades y modelos que forman la aplicación. Junto con los modelos, también se incluye lógica estrechamente relacionada con estos. En el contexto de la programación orientada a objetos, las funciones incluidas en el dominio pueden ser las de consulta y modificación de atributos de las clases que representan los modelos. En todo caso, la funcionalidad implementada en esta capa se limita a la lógica que no depende de sistemas externos ni de casos de uso del core.

De esta forma, se generan 3 capas:
- **Capa de dominio** - "Domain layer". Define las entidades y los modelos. No tiene dependencias. En Angular se implementa con clases o interfaces.
- **Capa de aplicación** - "Application layer". Define los casos de uso de la aplicación. Puede tener dependencias sobre el dominio. Implementa las funcionalidades expuestas por puertos primarios y depende de puertos secundarios. En Angular, son servicios que implementan los casos de uso y lógica común. Los puertos secundarios para el acceso a datos se implementan con el patrón de diseño "Repository"
- **Capa de infraestructura** - "Adapters layer". Implementa los adaptadores de los puertos primarios y puertos secundarios. En Angular, normalmente es un servicio, que puede estar implemnetando el patrón de diseño "Repository"

Con esta distribución, se puede ver que los elementos de presentación son parte de la infraestructura y necesitan de puertos primarios para ejecutar casos de uso. Por otro lado se puede observar que en la capa de lógica de negocio se tendría que hacer uso de puertos secundarios incluso para utilizar librerías como RxJS. Ambos son inconvenientes para los que podremos hacer una excepción para simplificar el código.

## Layout de proyecto

```js
src/
├── app/
│   ├── core/ // Módulo principal de la aplicación
│   ├── features/ // Módulos funcionales de la aplicación
│   │   ├── [module-name]/
│   │   └── ... Otros módulos
│   ├── pages/ // Páginas de la aplicación
│   │   ├── [module-name]-pages/
│   │   │   ├── [page-name]-page/
│   │   │   │   └── [page-name]-page.component.[ts|html|scss|spec]
│   │   │   └── [module-name].routes.ts
│   │   ├── [page-name]-page/
│   │   │   └── [page-name]-page.component.[ts|html|scss|spec]
│   │   └── ... // Otras páginas
│   ├── app.component.[ts|html|scss]
│   ├── app.module.ts
│   └── app.routing.module.ts
...
test/
└── utils/
```

La aplicación se organiza de la siguiente manera:

- Core. Módulo principal de la aplicación que puede ser utilizado por otros módulos
- Features. Listado de módulos de funcionalidades añadidas de la aplicación. Estos solamente pueden depender del módulo Core y no de otras features
- Pages. Contiene todas las páginas que componen la aplicación. Se pueden incluir agrupaciones por features

Por ahora es necesario definir el módulo de Angular AppModule por la falta de compatibilidad de Angular Universal con "standalone components".

## Layout de módulo
La estructura de módulos como el Core y Features está definida por los principios de la arquitectura hexagonal vista anteriormente:

- Dominio
  - Modelos
  - Lógica sobre entidades
- Aplicación
  - Servicios que implementan los casos de uso
- Puertos
  - Interfaces de puertos secundarios
  - Token para configurar la inyección de dependencias
- Infraestructura
  - Modelos
  - Adaptadores de puertos secundarios
  - Otros servicios
  - Componentes UI
    - Directivas
    - Pipe
    - Componentes "dumb"
    - Componentes "smart" o contenedores

Cada parte de la estructura de un módulo tendría sus tests y mocks
