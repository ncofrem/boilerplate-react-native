# Boilerplate Project React Native :rocket:

*Boilerplate de [React Native](https://facebook.github.io/react-native/) con [Redux](https://es.redux.js.org/) y [Redux Saga](https://redux-saga.js.org/) creado para [Nnodes](https://nnodes.com/) :boom:*

## Pre-requisitos :clipboard:

 - [**Git**](https://git-scm.com/)
  - **Node** *(sugerencia: [NVM](https://github.com/nvm-sh/nvm))*
 - **React Native**
 -  **Yarn**
 - [**Android Studio**](https://developer.android.com/studio/install?hl=ES) *(si vas a trabajar con la plataforma Android)*
 - [**XCode**](https://developer.apple.com/xcode/) *(si vas a trabajar con la plataforma iOS)*
 - [**CocoaPods**](https://cocoapods.org/) *(solo si vas a trabajar con la plataforma iOS)*

## Ejecutar proyecto :hammer_and_wrench:
### Clonar proyecto
Clonamos del repositorio el proyecto, para ello ejecutamos el comando:
```
git clone https://github.com/ncofrem/BoilerplateReactNative
cd BoilerplateReactNative
```
### Instalar paquetes
Ejecutamos uno de los siguientes comandos:
```
yarn install
```
o
```
npm install
```
---
### Agregar URL del Backend :gear:
Duplicamos el archivo **app/config/configurationsSample.js** con el nombre **configurations.js** y remplazamos el dominio y la versión por la de nuestro backend (si es necesario)

```
const API_CONFIG = {
	domain: 'http://backend.nnodes.com/api/',
	version: 'v1',
	...
};
```
---
### iOS
Instalamos las dependencias de CocoaPods (Esto se realiza una sola vez o cuando se agrega algún paquete que lo requiera)
```
cd ios
pod install
cd ..
```
---
### Ejecutamos el proyecto :fire:
 **Android:**
```
 yarn android
 ---
 o abrimos nuestro proyecto con Android Studio
```
 **iOS:**
```
 yarn ios
 ---
 o abrimos nuestro proyecto con XCode
```


## Crear proyecto desde cero :tada:

### Creamos un nuevo proyecto de React Native
```
npx react-native init ProjectName
cd ProjectName
```
> La versión actual de React Native es 0.61, puede que el comando cambie en las próximas versiones.

Verificamos que el proyecto esté funcionando correctamente en nuestras plataformas

 **Android:**
```
 yarn android
 ---
 o abrimos nuestro proyecto con Android Studio
```
 **iOS:**
Instalamos las dependencias de CocoaPods (Esto se realiza una sola vez o cuando se agrega algún paquete que lo requiera)
```
cd ios
pod install
cd ..
```
Ejecutamos nuestro proyecto
```
 yarn ios
 ---
 o abrimos nuestro proyecto con XCode
```
> Si todo funciona correctamente, podemos seguir al siguiente paso, de lo contrario, resolvemos los errores que se presenten.
---
### Agregamos los siguientes paquetes

 - [ ] prop-types *(15.7.2)*
 - [ ] react-native-dropdownalert *(4.2.0)*
 - [ ] hoist-non-react-statics *(3.3.1)*
 - [ ] react-native-extended-stylesheet *(0.12.0)*
 - [ ] react-native-gesture-handler *(1.5.2)*
 - [ ] react-native-vector-icons *(6.6.0)*
 - [ ] react-navigation *(4.0.10)*
 - [ ] react-navigation-stack *(1.10.3)*
 - [ ] react-navigation-tabs *(2.6.2)*
 - [ ] react-native-reanimated *(1.4.0)*
 - [ ] react-redux *(7.1.3)*
 - [ ] redux *(4.0.4)*
 - [ ] redux-logger *(3.0.6)*
 - [ ] redux-saga *(1.1.3)*
 - [ ] @react-native-community/async-storage *(1.7.0)*
 - [ ] jwt-decode *(2.2.0)*
 - [ ] snakecase-keys *(3.1.0)*

> La versión actual de cada paquete con la que se probó este Boilerplate es la que se encuentra entre paréntesis.

Comando para instalar todos los paquetes de la lista con su ultima versión:
```
yarn add prop-types react-native-dropdownalert hoist-non-react-statics react-native-extended-stylesheet react-native-gesture-handler react-native-vector-icons react-navigation react-navigation-stack react-navigation-tabs react-native-reanimated react-redux redux redux-logger redux-saga @react-native-community/async-storage jwt-decode snakecase-keys
```
Vereficamos que los paquetes agregados se estén *'autolinkeando'* correctamente, para ello volvemos a verificar que el proyecto esté funcionando correctamente en nuestras plataformas.

> Si todo funciona correctamente, podemos seguir al siguiente paso, de lo contrario, resolvemos los errores que se presenten.

---
### Agregamos el Linter :guardsman:

Utilizaremos la [guía de estilo de AirBnB](https://github.com/airbnb/javascript), para ello ocuparemos las siguientes herramientas:

 - **ESLint** *(Nos dice que estamos haciendo mal en nuestro código :exclamation:)*
 - **Prettier** *(Nos formatea el código automaticamente :tophat:)*
 - **Husky** *(No deja realizas commits ni hacer push si el Linter informa que hay código malo :cop:)*

Para ello, agregaremos los siguientes paquetes en modo *dev*:

 - [ ] eslint *(6.7.2)*
 - [ ] eslint-config-airbnb *(18.0.1)*
 - [ ] eslint-plugin-import *(2.19.1)*
 - [ ] eslint-plugin-jsx-a11y *(6.2.3)*
 - [ ] eslint-plugin-react *(7.17.0)*
 - [ ] prettier *(1.19.1)*
 - [ ] eslint-config-prettier *(6.7.0)*
 - [ ] eslint-plugin-prettier *(3.1.1)*
 - [ ] husky *(3.1.0)*
 - [ ] lint-staged *(9.5.0)*
 - [ ] pretty-quick *(2.0.1)*

> La versión actual de cada paquete con la que se probó este Boilerplate es la que se encuentra entre paréntesis.

Comando para instalar todos los paquetes de la lista con su ultima versión:
```
yarn add -D eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react prettier eslint-config-prettier eslint-plugin-prettier husky lint-staged pretty-quick
```
En nuestros archivos agregamos lo siguiente *(si el archivo no existe lo creamos)*:

 - **package.json**

```
{
	"scripts": {
		...
		"lint:fix": "eslint . --fix",
		"prettier": "prettier --write '.js'",
		"format-code": "yarn run prettier && yarn run lint:fix",
		"precommit": "lint-staged"
	},
	...
	"lint-staged": {
		"_.{js,jsx}": [
			"pretty-quick --staged",
			"eslint src/ --fix",
			"git add"
		]
	},
	"husky": {
		"hooks": {
			"pre-commit": "npm run lint",
			"pre-push": "npm run lint"
		}
	}
}
```

 - **.eslintrc.json**
```
{
	"extends": ["airbnb", "prettier", "prettier/react"],
	"plugins": ["prettier"],
	"rules": {
		"react/jsx-filename-extension": [
			2,
			{
				"extensions": [".js", ".jsx"]
			}
		],
		"react/prop-types": 0,
		"react/state-in-constructor": [1, "always"],
		"no-underscore-dangle": 0,
		"import/imports-first": ["error", "absolute-first"],
		"import/newline-after-import": "error",
		"react/jsx-props-no-spreading": "off",
		"global-require": "off"
	},
	"globals": {
		"window": true,
		"document": true,
		"localStorage": true,
		"FormData": true,
		"FileReader": true,
		"Blob": true,
		"navigator": true
	},
	"parser": "babel-eslint",
	"env": {
		"jest": true,
		"browser": true
	}
}
```

 - **.lintstagedrc**
```
{
	"\*.{js,jsx}": [
		"pretty-quick --staged",
		"eslint app/ --fix",
		"git add"
	]
}
```

 - **.huskyrc**
```
// .huskyrc
{
	"hooks": { }
}
```

 - **.prettierrc.js**
```
module.exports = {
	singleQuote: true
};
```

Eliminamos el archivo: **.eslintrc.js**

---
### Configurar VSCode para el correcto funcionamiento del Linter
Instalamos las siguientes extensiones en VSCode:

 - ESLint
 - Prettier - Code formatter

Agregamos el siguiente archivo en la raíz del proyecto

 - **.vscode/settings.json**
```
{
	"files.autoSave": "onFocusChange",
	"editor.formatOnSave": true,
	"editor.formatOnType": true,
	"eslint.enable": true,
	"prettier.singleQuote": true,
	"editor.tabSize": 2,
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true
	}
}
```
Finalmente reiniciamos VSCode :sparkles:

> Se utilizó [esta guía](https://medium.com/quick-code/how-to-integrate-eslint-prettier-in-react-6efbd206d5c4) para realizar la instalación del Linter.

---
### Copiando archivos desde el Boilerplate :package:
Copiamos la carpeta ***app*** de este proyecto y la pegamos en la raíz de nuestro proyecto.

Cambiamos el contenido del  **App.js**:
```
import  App  from  './app/index';

export  default  App;
```
---
### Agregar URL del Backend :gear:
Duplicamos el archivo **app/config/configurationsSample.js** con el nombre **configurations.js** y remplazamos el dominio y la versión por la de nuestro backend (si es necesario)

```
const API_CONFIG = {
	domain: 'http://backend.nnodes.com/api/',
	version: 'v1',
	...
};
```

## Extras :pushpin:

### Git
En tu **.gitignore** agrega:
```
...
# configs
app/config/configurations.js
```
---
### NVM
Si utilizas *nvm*, agrega el siguiente archivo:
- **.nvmrc**
```
Tu versión de node (ejemplo: v12.6.0)
```
