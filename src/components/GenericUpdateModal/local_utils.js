export default function giveMakeOver(label) {
    let useBigTextField = false
    let shouldSkip = false
    
    if (label === "created_at" || label === "updated_at" || label === "deleted_at" || label === "password" || label === "active" || label === "id") {
        shouldSkip = true
        return {shouldSkip, useBigTextField, label}
    }

    label.replace("_", " ")
    label = label.charAt(0).toUpperCase() + label.slice(1)

    if (label === "description") {
        useBigTextField = true
    }

    return { shouldSkip, useBigTextField, label };
}