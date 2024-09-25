# ThotGraph - Redescubriendo la Geometría

[**Acceder a la demo del Nivel 1**](https://jeidsgn.github.io/ThotGraph/)

## Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Inspiración](#inspiración)
- [Instrucciones del Nivel 1](#instrucciones-del-nivel-1)
- [Tecnologías Usadas](#tecnologías-usadas)
- [Contribuciones](#contribuciones)

---

## Descripción del Proyecto

**ThotGraph** es una aplicación interactiva inspirada en el antiguo Egipto y en el libro "Los Elementos" de Euclides. Concebida como un cruce entre la estética **cyberpunk** y las raíces geométricas de la civilización egipcia, **ThotGraph** te permite recrear las proposiciones geométricas euclidianas mediante una interfaz interactiva y visualmente impactante.

Cada nivel corresponde a una proposición de Euclides, y las herramientas disponibles están basadas en los postulados y definiciones que se encuentran en los primeros libros de "Los Elementos". La idea es combinar el rigor matemático de la geometría clásica con una experiencia visual y una narrativa contemporánea.

## Inspiración

Este proyecto está inspirado en:

1. **La geometría práctica egipcia**: Recordando cómo los antiguos medían y delimitaban sus tierras, utilizando estacas y cuerdas para definir puntos, líneas y círculos.
2. **Geogebra**: Aunque simplificado, **ThotGraph** busca proporcionar una plataforma de geometría dinámica, enfocada en la recreación de los principios elementales de Euclides.
3. **Estética cyberpunk**: Los íconos y colores en neón en contraste con un fondo oscuro evocan un entorno moderno, mientras que los elementos clave (círculos, líneas y segmentos) se representan como cuerdas tensadas, haciendo un guiño a las herramientas antiguas.

### Características Clave:
- **Iconografía en arena y neón**: Un equilibrio entre lo antiguo y lo moderno.
- **Herramientas basadas en los postulados euclidianos**: Solo puedes agregar elementos geométricos siguiendo las reglas de Euclides.
- **Interfaz dinámica**: La "Toolbox" (caja de herramientas) está centrada en la parte inferior, con botones amarillos en forma de triángulo que evoca a las pirámides.

---


### Explicación de los principales archivos:

1. **Elements/Elements.js**: Contiene las clases base de los elementos geométricos (puntos, líneas, círculos, segmentos).
2. **js/Board.js**: Se encarga del tablero donde se visualizan las figuras.
3. **js/Toolbox.js**: Controla las herramientas que el usuario puede seleccionar, tales como mover puntos, dibujar círculos, líneas y segmentos.
4. **levels/lvl1.js**: El código que define las condiciones y reglas del primer nivel, basado en la primera proposición de Euclides.
5. **game.js**: Configura el flujo del juego, inicializando el entorno y gestionando la interacción entre los elementos y el tablero.
6. **index.js**: Archivo principal que conecta y ejecuta los scripts.
7. **phaser.min.js**: El motor de juego **Phaser** se utiliza para gestionar las interacciones y animaciones.
8. **style.css**: La hoja de estilos que define la estética de la aplicación, desde el fondo oscuro hasta los colores de los íconos y figuras geométricas.

---

## Instrucciones del Nivel 1

### Proposición 1: Dibuja un triángulo equilátero dados dos puntos

En este nivel, aprenderás a construir un **triángulo equilátero** utilizando dos puntos dados en la interfaz.

#### Paso a Paso:

1. **Inicia el nivel**: 
   - Al entrar, verás **dos puntos** iniciales colocados en el tablero.

2. **Activar el movimiento de los puntos**:
   - Si deseas mover los puntos iniciales, haz clic en el **botón de movimiento** (icono con flechas). Esto te permitirá reposicionar los puntos a tu gusto.

3. **Crear un círculo o línea**:
   - Para continuar, debes trazar un **círculo**, **línea** o **segmento**. Selecciona la herramienta en la barra de herramientas y haz clic en ambos puntos para generar la figura correspondiente.
   - Ejemplo: Si seleccionas el botón de círculo, haz clic en un punto para fijar el centro, y en el otro para establecer el radio.

4. **Dibuja el segundo círculo**:
   - Repite el mismo proceso anterior, pero esta vez usando el otro punto como centro. Ahora tendrás dos círculos que se cruzan en dos puntos.

5. **Coloca el tercer punto**:
   - Haz clic en el **botón de estaca** (icono de punto) y selecciona una de las intersecciones de los círculos para colocar el tercer punto.

6. **Completa el triángulo**:
   - Selecciona el **botón de línea o segmento** y une los tres puntos (los dos originales y el nuevo en la intersección). ¡Felicidades, has creado un triángulo equilátero!

### Concepto Geométrico:
- Este nivel sigue la **Proposición 1 de Euclides**, donde se traza un triángulo equilátero utilizando dos círculos con radios iguales. El tercer punto se coloca en una de las intersecciones de los círculos y luego se conectan para formar el triángulo.

Puedes probar el nivel en el siguiente enlace: [**ThotGraph - Nivel 1**](https://jeidsgn.github.io/ThotGraph/).

---

## Tecnologías Usadas

- **Phaser.js**: Un motor de juegos en 2D utilizado para gestionar las interacciones dinámicas y las animaciones.
- **JavaScript (ES6)**: El lenguaje principal que controla la lógica del juego y las interacciones geométricas.
- **HTML5 y CSS3**: Para el diseño visual y la estructura de la aplicación.
- **GitHub Pages**: Para la publicación y el despliegue del proyecto.
- **SVG/Canvas**: Para la representación gráfica de los elementos geométricos.

---

## Contribuciones

Si te interesa contribuir al desarrollo de **ThotGraph**, por favor abre un issue o realiza un pull request. ¡Toda aportación es bienvenida! Algunas áreas que necesitan mejora son:

- **Nuevos niveles**: Implementación de más proposiciones de Euclides.
- **Mejoras visuales**: Animaciones adicionales o refinamientos en la estética.
- **Gamificación**: Añadir elementos de retroalimentación o recompensas para mejorar la experiencia de usuario.

---
