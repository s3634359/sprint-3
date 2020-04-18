
## About Humanoid Management System

Humanoid Management System is a web application that can be used to manage tour details (locations and types) conducted by a humanoid robot in an exhibition centre. The application is built by using

- [Laravel](https://laravel.com/).
- [MySQL](https://www.mysql.com/)
- [Axios](https://github.com/axios/axios).
- [React](https://reactjs.org/).
- [MATERIAL-UI](https://material-ui.com/).
- [Bootstrap](https://getbootstrap.com/).

# Requirements
• create accounts for new admins and assistants,
• deactivate admin and assistant users,
• add new locations to the set of locations: a location should be specified by its name, x-y coordinates, description, and the
min. time to be spent on the location (the time depends on the length of the description, as the robot will “pronounce” it
using text-to-voice feature),
• edit existing locations (name, x-y coordinates, description, min. time),
• copy existing locations,
• remove existing locations,
• create a new tour out of the specified locations: the tour should be specified by its name, type, min. duration (which is a
sum of the minimal times to spend at each location),
• edit the set of tour types – add new types, remove the types that are unnecessary, change the type label,
• edit existing tours (add or remove locations, edit the tour name,
• remove existing tours.