export function updateTransactions(isPaid) {
    const paymentStatus = document.querySelector(".payment-details .status .status-selector");
    const paymentMethod = document.querySelector(".payment-details .method .method-selector");
    if (isPaid) {
        if (paymentStatus) {
            paymentStatus.textContent = "paid";
            paymentStatus.style.color = "var(--color-green-01)";
        }
        if(paymentMethod) paymentMethod.textContent = "card";

    } else {

        if (paymentStatus) {
            paymentStatus.textContent = "pending";
            paymentStatus.style.color = "var(--color-yellow-01)";
        }
    }
}