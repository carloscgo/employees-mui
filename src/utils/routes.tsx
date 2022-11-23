// import List from '../components/List'
// import Form from '../components/Form'

export default [{
  path: '/employee/edit/:id',
  slug: 'employee',
  name: 'Employee',
  icon: 'bi bi-speedometer',
  component: <div>Employee</div>,//<Form type="edit" />,
  isMenu: false,
  index: 2
}, {
  path: '/employee/add',
  slug: 'addEmployee',
  name: 'Add New',
  icon: 'bi bi-person-plus-fill',
  component: <div>addEmployee</div>,//<Form type="new" />,
  isMenu: true,
  index: 1
}, {
  path: '/dashboard',
  slug: 'home',
  name: 'Dashbord',
  icon: 'bi bi-speedometer',
  component: <div>home</div>,//<List />,
  isMenu: true,
  index: 0
}, {
  path: '*',
  slug: 'home',
  name: 'Dashbord',
  icon: 'bi bi-speedometer',
  component: <div>home</div>,//<List />,
  isMenu: false,
  index: 0
}];
