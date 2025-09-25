

export function arraysEqual(a, b) {
    if (!a || !b) return false;
    if (a.length !== b.length) return false;
    a = [...a].sort();
    b = [...b].sort();
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
export function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;

}
