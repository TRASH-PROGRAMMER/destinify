"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelerProfiles = void 0;
class TravelerProfiles {
    id;
    userId;
    budgetMin;
    budgetMax;
    currency;
    preferredStyle;
    accessibilityNeeds;
    constructor(id, userId, budgetMin, budgetMax, currency, preferredStyle, accessibilityNeeds) {
        this.id = id;
        this.userId = userId;
        this.budgetMin = budgetMin;
        this.budgetMax = budgetMax;
        this.currency = currency;
        this.preferredStyle = preferredStyle;
        this.accessibilityNeeds = accessibilityNeeds;
    }
}
exports.TravelerProfiles = TravelerProfiles;
