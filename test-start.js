console.log('=== Test Start Script ===');
console.log('Current directory:', process.cwd());

// Check if dist/app.js exists
const fs = require('fs');
if (fs.existsSync('./dist/app.js')) {
    console.log('✅ dist/app.js exists');
} else {
    console.log('❌ dist/app.js does NOT exist');
    console.log('Files in current directory:');
    try {
        const files = fs.readdirSync('.');
        files.forEach(file => console.log('  ' + file));
    } catch (error) {
        console.error('Error reading directory:', error.message);
    }
}

console.log('=== End Test Start Script ==='); 