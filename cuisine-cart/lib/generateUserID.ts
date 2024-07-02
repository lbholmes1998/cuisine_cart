// Generates a random string of letters and numbers, for use when creating unique user ID's.

export default function genId(length: number) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    const charLength = chars.length

    let result = ''

    // Create loop to grab a certain number of random characters from chars string
    let count = 0;
    while (count !== length) {
        result += chars.charAt(Math.floor(Math.random() * charLength))
        count += 1
    }

    return result
}
