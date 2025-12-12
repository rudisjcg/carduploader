Card Uploader – Credit Card CRUD

Este proyecto corresponde a una prueba técnica que consiste en el desarrollo de un CRUD completo de tarjetas de crédito, permitiendo crear, listar, editar y eliminar tarjetas, con un backend en Express + MongoDB y un frontend en React (Vite).

📌 Descripción general

La aplicación permite gestionar tarjetas de crédito mediante las siguientes operaciones:

✅ Crear tarjetas

📄 Listar todas las tarjetas

✏️ Editar tarjetas existentes

🗑️ Eliminar tarjetas

La arquitectura está separada en frontend y backend, comunicándose a través de una API REST.🧱 Arquitectura del proyecto

```bash
  card_uploader/
│
├── backend/        # API REST (Express + MongoDB)
│
├── frontend/       # Aplicación React (Vite)
│
└── README.md
```

⚙️ Backend
📍 Tecnologías utilizadas

Node.js

Express

MongoDB + Mongoose

Multer (para manejo de multipart/form-data)

UUID (identificadores únicos)

Morgan (logging)

📡 Endpoints disponibles

Obtener todas las tarjetas

```bash
GET /cards
```

Crear una tarjeta

```bash
POST /cards
```

Body (FormData):

cardNumber

cardName

monthly

year

cvv

🔹 Actualizar una tarjeta


```bash
PUT /cards/:id
```

Eliminar una tarjeta

```bash
DELETE /cards/:id
```


Modelo de datos (Card)

```bash
{
  id: String,
  cardName: String,
  cardNumber: String,
  expMonth: String,
  expYear: String,
  last4: String,
  cvv: String
}
```

crear un .env 

Copiar y pegar el mongoDB URI que les mande por correo.

Ejecutar el backend

```bash
cd backend
npm install
npm run dev

el servidor corre en:

http://localhost:4000
```


🎨 Frontend
📍 Tecnologías utilizadas

React

Vite

TypeScript

Chakra UI

Tailwind CSS

TanStack React Query

Context API

🧩 Componentes principales

Form → Crear y editar tarjetas

CardList → Listar tarjetas

Card → Vista individual de tarjeta

CardContext → Manejo de estado global

🔄 Sincronización en tiempo real

El frontend utiliza React Query (useQuery + useMutation) para:

Refrescar automáticamente la lista de tarjetas al crear, editar o eliminar

Manejar estados de loading y error

Invalidar cache de forma eficiente


```bash
cd frontend
npm install
npm run dev

```


🧪 Funcionalidades implementadas
✔️ Validaciones de formulario

✔️ Control de expiración de tarjeta

✔️ Manejo de estados con Context API

✔️ CRUD completo funcional

✔️ Manejo de errores en frontend y backend

✔️ Arquitectura limpia y modular

📎 Notas finales
Este proyecto fue desarrollado como prueba técnica, siguiendo buenas prácticas de separación de responsabilidades, claridad en la API y manejo de estado en frontend. 



