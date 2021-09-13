// import React, { Component } from "react";
// import { getUsers, getOrganizations } from "./api";
//
// class App extends Component {
//   state = {
//     loading: true,
//     selectedOrg: null
//   };
//
//   //users, organizations инициализируются в конструкторе
//   users = [];
//   organizations = [];
//   componentDidMount() {
//     getUsers()
//       .then((users) => (this.users = users))
//         //это не цепочка, добавили несколько обработчиков к одному промису
//       .then(() => getOrganizations())
//       .then((organizations) => (this.organizations = organizations))
//       .then(() => this.setState({ loading: false }));
//     //нет обработки ошибки, при ошибке loading может не переключиться
//   }
//
//   selectOrg = (org) => {
//     this.setState({ selectedOrg: org });
//   }
// //для определения методов в классе не и спользуют стрелочную функцию(нет this)?
//   resetSelectedOrg = () => {
//     this.setState({ selectedOrg: false });
//   }
//
//   render() {
//     if (this.state.loading) {
//       return "Loading...";
//     }
//
//     let users = [];
// //логику лучше вынести в метод
//     for (let i = 0; i < this.users.length; i++) {
//       const name = this.users[i].name;
//       let org;
//
//       for (let j = 0; j < this.organizations.length; j++) {
//         if (this.organizations[j].id === this.users[i].organization) {
//           org = this.organizations[j].name;
//         }
//       }
//лучше сделать массив данных и мапить из него, а не push сразу
//       users.push(
//         <div className="user-list-item">
//           <div>name: {name}</div>
//           <div onClick={() => this.selectOrg(org)}>org: {org}</div>
//         </div>
//       );
//     }
// //дублирование логики
//     if (this.state.selectedOrg) {
//       users = [];
//       for (let i = 0; i < this.users.length; i++) {
//         const orgId = this.organizations.find(
//           (o) => o.name === this.state.selectedOrg
//         ).id;
//
//         if (this.users[i].organization === orgId) {
//           users.push(
//нету key
//             <div className="user-list-item">
//               <div>name: {this.users[i].name}</div>
//               <div>org: {this.state.selectedOrg}</div>
//             </div>
//           );
//         }
//       }
//     }
//
//     return (
//       <div>
//           {/*this.state.selectedOrg условие не сработает при id организации 0, (надо более строгая проверка, а не по falsy) */}
//         {this.state.selectedOrg && (
//           <button onClick={() => this.resetSelectedOrg()}>
//             reset selected org
//           </button>
//         )}
//         <div className="user-list">{users}</div>
//       </div>
//     );
//   }
// }
//
// export default App;
