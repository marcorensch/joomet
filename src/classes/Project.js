export default class Project{
    _id;_title;_platform;_createdAt;_updatedAt;_author;_fields;

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get platform() {
        return this._platform;
    }

    set platform(value) {
        this._platform = value;
    }

    get createdAt() {
        return this._createdAt;
    }

    set createdAt(value) {
        this._createdAt = value;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    set updatedAt(value) {
        this._updatedAt = value;
    }

    get author() {
        return this._author;
    }

    set author(value) {
        this._author = value;
    }

    get fields() {
        return this._fields;
    }

    set fields(value) {
        this._fields = value;
    }


    constructor(id, title, platform, createdAt) {
        this._id = id;
        this._title = title;
        this._platform = platform;
        this._createdAt = createdAt;
    }
}