const fs = require('fs');
const path = require('path');

console.log('=== Verification Script ===');
console.log('Current directory:', process.cwd());
console.log('Files in current directory:');
try {
    const files = fs.readdirSync('.');
    files.forEach(file => {
        const stats = fs.statSync(file);
        console.log(`  ${file} - ${stats.isDirectory() ? 'DIR' : 'FILE'}`);
    });
} catch (error) {
    console.error('Error reading directory:', error.message);
}

console.log('\nChecking for dist folder:');
try {
    if (fs.existsSync('dist')) {
        console.log('dist folder exists');
        const distFiles = fs.readdirSync('dist');
        console.log('Files in dist:', distFiles);

        if (fs.existsSync('dist/app.js')) {
            console.log('dist/app.js exists');
        } else {
            console.log('dist/app.js does NOT exist');
        }
    } else {
        console.log('dist folder does NOT exist');
    }
} catch (error) {
    console.error('Error checking dist folder:', error.message);
}

console.log('\nChecking for src folder:');
try {
    if (fs.existsSync('src')) {
        console.log('src folder exists');
        const srcFiles = fs.readdirSync('src');
        console.log('Files in src:', srcFiles);
    } else {
        console.log('src folder does NOT exist');
    }
} catch (error) {
    console.error('Error checking src folder:', error.message);
}

console.log('=== End Verification ==='); 