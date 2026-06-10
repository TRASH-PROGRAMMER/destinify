"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    email;
    password_hash;
    id;
    name;
    lastname;
    phone;
    avatar_url;
    country;
    preferred_language;
    timezone;
    status;
    last_login;
    created_at;
    updated_at;
    constructor(email, password_hash, id, name, lastname, phone, avatar_url, country, preferred_language, timezone, status, last_login, created_at, updated_at) {
        this.email = email;
        this.password_hash = password_hash;
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.phone = phone;
        this.avatar_url = avatar_url;
        this.country = country;
        this.preferred_language = preferred_language;
        this.timezone = timezone;
        this.status = status;
        this.last_login = last_login;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.User = User;
