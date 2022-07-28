# Ejemplo de uso de RTL
![app](https://user-images.githubusercontent.com/95310897/181593838-d9ec5e04-0d56-492b-b263-f85af761bee5.png)

### TL;DR 

Si no querés leerme divagando sobre testing andá [acá](#Usando-RTL) para ver sólo lo referente a este ejemplo.

# Testear componentes en React

Hay varias maneras de testear componentes en React. A grosso modo podemos dividirlas en dos categorías:
- Renderizar árboles de componentes en un entorno simplificado y usar acerciones en sus respectivas salidas.
- Correr la aplicación completa en un entorno de navegador realista.

De la misma manera, existen numerosas herramientas para ambos casos. De todas ellas, __React__ nos recomienda __Jest__ y __React testing library__ para testear componentes/árboles de componentes de manera individual.

__Jest__ puede usarse junto con las herramientas que nos brinda __React__ a través de __react__ y __react-dom__ para crear tests para nuestros componentes. Otra biblioteca popular es __Enzyme__ de __Airbnb__. Sin embargo, testear de esta manera no es muy simple ni muy intuitivo. Allí entra __React testing library__.

# Enter RTL

__React testing library__ es una colección de paquetes que nos ayuda a testear _desde el punto de vista del usuario_.

En lugar de testear estados internos, ciclo de vida, etc, testeamos lo que espera el usuario: _"Si hago click en este ícono espero ver un menú desplegable...", "Haciendo click en este botón espero que pase tal cosa..."_. De esa manera, estos test nos dan confianza en que nuestros componentes hacen lo que queríamos que hicieran.

>_Testeamos para tener confianza en nuestro código_.

# Decidido, usamos RTL y no se hable más...

Bueno, no :blush:. RTL nos va a ayudar a tener un buen enfoque sobre qué testear y cuándo y cómo hacerlo. Cualquier otra solución de testing se puede usar a gusto de cada uno. Hablando de soluciones:

Este ejemplo se concentra sólo en _testing_, como una parte del desarrollo. Pero no es la única parte a tener en cuenta. En el caso particular de crear nuestra propia biblioteca de estilos y componentes, los tests nos darán la confianza de que nuestros componentes hacen lo que tienen que hacer y no rompen a los demás componentes si seguimos ciertos principios de diseño y desarrollo.

# TDD en el front. ¿Sí o no?

Algo así. El testing en el front no está tan claro como en el back o en otras aplicaciones. Más que __TDD__, podemos hablar de __CDD__ o _Component driven development__ que, como suena, va de la manito con atomic design y sus amigos.

Además debemos tener en cuenta la naturaleza variable del front (móvil, escritorio, tablet, responsivo, y 500 media queries...) y la necesidad de ver lo que estamos haciendo. Para ello, nuevamente, hay muchísimas herramientas que nos ayudan a desarrollar nuestros componentes y nuestras apps.

Tienen mucho en común, eso sí. Todas dicen ser...
- La más popular
- La más elegida por los desarrolladores / grandes compañías
- La más moderna/efectiva/veloz etc...

Se entiende la idea :joy:...

Siguiendo una serie de criterios estrictos (_detín, marín, dedó, pingüé..._) vemos que para el desarrollo podemos usar una herramienta como __Storybook__, que nos permitirá en un mismo entorno tener/crear nuestro Design System, nuestros componentes, y testear, tódo con la misma herramienta.

En caso de elegir __Storybook__ como nuestra herramienta de desarrollo, __podremos aplicar nuestro conocimiento en testing con RTL para testera *allí mismo* nuestros componentes_.

# Usando-RTL

RTL nos brinda ciertas funciones/métodos que nos permiten testear con facilidad los componentes. A través de ellos podemos renderizarlos, disparar eventos, simular procesos asincrónicos, encontrar elementos en el DOM, verificar su estado (como elemento), su contenido, y muchas cosas más.

Lo bueno de RTL es que tiene un lenguaje sencillo y fácil de dominar:

- La función __render()__ nos permite renderizar el componentes a testear
- El objeto __screen__ y sus métodos nos permitirán hacer aserciones y encontrar nuestros elementos en el DOM
- Objetos como __fireEvent__ simularán eventos...

Como se puede observar, los objetos y métodos que nos da RTL son muy fáciles de comprender y usar. 

Las consultas que nos da la función __render__ de RTL son las mismas que las de DOM testing library, pero con el primer argumento ya vinculado al documento (bound):

_DOM testing library: getByTest(node, 'text')_
_React testing library: getByText('text')_

Los tipos de consultas que tenemos se forman de la siquiente manera:

- getBy
- findBy
- queryBy
- getAllBy
- findAllBy
- queryAllBy

Donde "By" puede ser uno de los siguientes:

- ByLabelText
- ByPlaceholderText
- ByText
- ByDisplayValue
- ByTitle
- ByRole
- ByTestId

RTL nos da estas promesas para eventos __async__:

- waitFor
- waitForElementToBeRemoved

Y los disparadores de eventos:

- fireEvent(nodo, evento)
- fireEvent.[evento como "click", "focus", etc]
- act

Para buscar coincidencias de texto, se pueden usar tanto cadenas literales como expresiones regulares (recomendado).

Una vez que encontramos el elemento que buscamos, simplemente usamos aserciones como de costumbre:
```js
expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')

expect(screen.getByRole('button')).not.toBeDisabled()
```

Podemos ver una lista de aserciones de __jest-don__ [en la descripción del paquete](https://www.npmjs.com/package/@testing-library/jest-dom)

O si prefieres una lectura más ligera [este artículo](https://learntechsystems.com/assertions-in-react-testing-library/) es conciso y al grano.

La [documentación](https://testing-library.com/docs/react-testing-library/intro) es muy sencilla y accesible, y cuenta con numerosos ejemplos.

# Salvedades

Por defecto, aplicaciones creadas con __Create React App__ ya soportan (supuestamente) __RTL__ y no requiere configuración extra (de nuevo, supuestamente 😅)

Para correr este ejemplo, simplemente clonar y darle
```bash
npm i
```

Pero si estás creando el proyecto desde cero, deberás instalar RTL
```bash
npm install --save-dev @testing-library/react
```

Si estás usando __jest__ 28 o superior, hay que instalar __jest-environment-jsdom__ de manera separada
```bash
npm install --save-dev jest-environment-jsdom
```

Y agregar en tu __jest.config.js__
```js
 module.exports = {
+  testEnvironment: 'jsdom',
   // ... other options ...
 }
 ```
 
 Para otras veriones de __jest__, ver [la configuración.](https://testing-library.com/docs/react-testing-library/setup)
 
 Ahora, __Jest__ por defecto _no va a entender **JSX** en tu código_. Para hacerlo puedes transpilar con babel:
 
 ```bash
 npm i @babel/preset-react –save-dev
 
 # o con yarn...
 yarn add -D @babel/preset-react
 ```
 
 Y luego pon en tu __babel.config.js__
 ```js
 module.exports = {
    presets: [
      '@babel/preset-react',
      [ 
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
  };
  ```
  
  Finalmente, corre los tests con 
  ```bash
  npx jest --watch
  ```
  
  o agrega el comando en tu _package.json_ y simplemente
  
  ```bash
  npm run test
  ```
  
  ¡Prueba agregando nuevos componentes y tests!
  
  ¡Y eso es to, eso es to, eso es todo amigos :pig:!
