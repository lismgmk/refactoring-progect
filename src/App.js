import React, {Component} from "react";
import {getUsers, getOrganizations} from "./api";

class App extends Component {

    state = {
        loading: true,
        selectedOrg: null,
        users: [],
        organizations: [],
        error: null,
        filerUsers: []
    };
//создаем 2 дополнительных локальных состояния error (будет отвечать за ошибки при запросе),
// filerUsers отвечает за фильтрацию


    componentDidMount() {
        Promise.all([getUsers(), getOrganizations()])
            .then(requests => {
                this.setState({
                    users: requests[0],
                    organizations: requests[1],
                    loading: false,
                    filerUsers: requests[0]
                })
            }, error => {
                this.setState({
                    error: 'Error with fetch',
                    loading: false
                })
            })
        //делаем Promise.all что бы паолучить обязательно и юзеров и организации
    }



    getCurrentArray(users, org) {
        let usersCurrent = []
        let orgCurrent = ''
        let organizationId = ''
        for (let i = 0; i < users.length; i++) {
            for (let j = 0; j < org.length; j++) {
                if (org[j].id === users[i].organization) {
                    orgCurrent = org[j].name
                    organizationId = org[j].id
                }
            }
            usersCurrent.push({
                id: users[i].id,
                name: users[i].name,
                organization: orgCurrent,
                organizationId: organizationId
            })
        }
        return usersCurrent
        //вводим usersCurrent, от которого мы делаем финишную отрисовку
    }

    resetSelectedOrg() {
        this.setState({selectedOrg: false});
        this.setState({
            filerUsers: this.state.users
        })
        //меняем состояние при клике
    }

    handleFilterClick(org) {
        this.setState({
            selectedOrg: org
        })
        this.setState({
            filerUsers: this.state.users.filter(i => i.organization === org)
        })
        //меняем состояние при клике
    }


    drawUsers(currentObj) {

        return currentObj.map((i, index) => {
                return <div
                    key={index}
                    className="user-list-item">
                    <div>name: {i.name}</div>
                    <div
                        onClick={() => this.handleFilterClick(i.organizationId)}
                    >org: {i.organization}</div>
                </div>
            }
        )
        //отрисовка
    }

    render() {
        if (this.state.loading) {
            return "Loading...";
        }

        return (
            <div>
                {this.state.error}

                {typeof this.state.selectedOrg === "number" && (
                    <button onClick={() => this.resetSelectedOrg()}>
                        reset selected org
                    </button>
                )}
                <div
                    className="user-list">{this.drawUsers(this.getCurrentArray(this.state.filerUsers, this.state.organizations))}</div>
            </div>
        );
    }
}

export default App;
