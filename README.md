# Dentali - Sistema de Gestión Odontológica

## 🦷 Descripción
Dentali es una plataforma web avanzada desarrollada con **Angular** para la gestión integral de clínicas dentales. El sistema se enfoca en la eficiencia operativa y el manejo seguro de la información de profesionales y pacientes.

## 🚀 Funcionalidades Implementadas

### 👨‍⚕️ Gestión de Odontólogos (Módulo CRUD)
Se ha desarrollado un ecosistema completo para la administración de profesionales:

- **Alta de Dentistas (`dentista-new`)**: 
  - Registro con validación en tiempo real.
  - **Fecha de Registro Protegida**: Campo de solo lectura que asigna automáticamente la fecha actual.
  - **Seguridad**: Validación estricta de contraseñas (mínimo 7 caracteres).
- **Edición Dinámica (`dentista-edit`)**: 
  - Carga de datos con `patchValue`.
  - **Manejo de Roles**: Selector que traduce valores técnicos (`ROLE_USER`) a etiquetas amigables ("Usuario") y permite la edición fluida de permisos.
  - **Persistencia Robusta**: Transformación de datos en el envío para asegurar compatibilidad con la estructura de arrays de roles del Backend.
  - **Contraseña Opcional**: Flexibilidad para actualizar perfiles sin necesidad de reingresar credenciales si no se desea cambiarlas.
- **Detalle del Profesional (`dentista-detail`)**:
  - Vista optimizada con Observables (`async pipe`).
  - Formateo de fechas localizado a `DD/MM/YYYY` usando lógica UTC para evitar desfases de zona horaria.

### 🔐 Autenticación y Seguridad
- **Sistema JWT**: Autenticación basada en tokens para sesiones seguras.
- **Auth Guards**: Protección de rutas internas para evitar accesos no autorizados.
- **Interceptores HTTP**: Inyección automática del token de autorización en cada petición al servidor.
- **Manejo de Sesión**: Logout automático y detección de tokens expirados (errores 401).

### 🛠️ Características Técnicas
- **Formularios Reactivos**: Uso de `FormBuilder` para validaciones complejas y estados de control (`disabled`, `invalid`).
- **Mapeo de Modelos**: Lógica de conversión de datos para sincronizar el campo `role` del frontend con el array `roles` del backend.
- **UX/UI**: Uso de estados de carga (`loading`), manejo de errores y navegación fluida entre módulos.

## 📂 Estructura del Proyecto (Módulo Odontólogos)

```bash
src/app/components/paginas/odontologos/
├── components/
│   ├── dentista-new/    # Lógica de creación y validación inicial
│   ├── dentista-edit/   # Lógica de actualización y mapeo de datos
│   └── dentista-detail/ # Visualización de datos y pipes de formato
├── models/              # Interfaces de datos (Dentista)
└── services/            # Comunicación centralizada con la API REST
```

## 🔧 Configuración y Uso

1. **Instalación**: `npm install`
2. **Desarrollo**: `ng serve` para levantar el servidor local en `http://localhost:4200`.
3. **Autenticación**: Asegúrese de configurar la URL del backend en los servicios de autenticación antes de iniciar.

---
*Sistema desarrollado con un enfoque en la calidad de código, mantenibilidad y seguridad de datos.*
