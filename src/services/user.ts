import Config from './config'
import Http from 'axios'

const token = localStorage.getItem('user_token')

const Login = async (email: string, password: string) => {
    let response = await Http.post(Config.BASE_URL + '/user/login', {
        email, password
    })

    return response.data
}

const Register = async (email: string, password: string, password_confirmation: string) => {
    let response = await Http.post(Config.BASE_URL + '/user/register', {
        email, password, password_confirmation
    })

    return response.data
}

const Activate = async (email: string, key: string) => {
    let response = await Http.get(Config.BASE_URL + '/user/activation?email=' + email + '&key=' + key)

    return response.data
}

const ForgotPassword = async (email: string) => {
    let response = await Http.post(Config.BASE_URL + '/password/recover', {
        email
    })

    return response.data
}

const ResetPassword = async (password: string, password_confirmation: string, token: string) => {
    let response = await Http.post(Config.BASE_URL + '/password/reset', {
        password, password_confirmation, token
    })

    return response.data
}

const ChangePassword = async (current_password: string, new_password: string, password_confirmation: string) => {
    let response = await Http.post(Config.BASE_URL + '/user/changePassword?token=' + token, {
        current_password, new_password, password_confirmation
    })

    return response.data
}

const Retrieve = async () => {
    let response = await Http.get(Config.BASE_URL + '/user/getDataProfile?token=' + token)
    return response.data
}

const TeamMembers = async () => {
    let response = await Http.get(Config.BASE_URL + '/settings/teamMembers?token=' + token)
    return response.data
}

const EditProfile = async (first_name: string, last_name: string, title: string, phone_number: string, location: string, company: string, language: string) => {
    let response = await Http.post(Config.BASE_URL + '/user/editProfile?token=' + token, {
        first_name, last_name, title, phone_number, location, company, language
    })

    return response.data
}

export default {
    Login, Register, Activate, ForgotPassword, ResetPassword, ChangePassword, EditProfile, Retrieve, TeamMembers
}