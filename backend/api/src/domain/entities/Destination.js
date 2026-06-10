"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Destination = void 0;
class Destination {
    name;
    slug;
    description;
    id;
    city;
    province;
    country;
    latitude;
    longitude;
    climate;
    popularity_score;
    created_at;
    constructor(name, slug, description, id, city, province, country, latitude, longitude, climate, popularity_score, created_at) {
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.id = id;
        this.city = city;
        this.province = province;
        this.country = country;
        this.latitude = latitude;
        this.longitude = longitude;
        this.climate = climate;
        this.popularity_score = popularity_score;
        this.created_at = created_at;
    }
}
exports.Destination = Destination;
