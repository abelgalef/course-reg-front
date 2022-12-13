export default function giveMakeOver(label) {
    let useBigTextField = false
    let shouldSkip = false
    let type = "textfield"
    
    if (label === "created_at" || label === "updated_at" || label === "deleted_at" || label === "password" || label === "active" || label === "id") {
        shouldSkip = true
        return {shouldSkip, useBigTextField, label, type}
    }

    if (label === "desc") {
        label = "description"
    }

    label = label.replace("_", " ")
    label = label.charAt(0).toUpperCase() + label.slice(1)

    if (label === "description") {
        useBigTextField = true
    }

    if (label === "semster_expiry") {
        type = "date"
    }

    return { shouldSkip, useBigTextField, label, type };
}