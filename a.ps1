# Create-MERNChatApp.ps1
# Yeh script 'real-time-chat-app' ki tamam directories aur khaali text-based files sirf agar maujood na hon to banayega.

# List of directories to create
$dirs = @(
  "real-time-chat-app",
  "real-time-chat-app\backend",
  "real-time-chat-app\backend\src",
  "real-time-chat-app\backend\src\config",
  "real-time-chat-app\backend\src\constants",
  "real-time-chat-app\backend\src\controllers",
  "real-time-chat-app\backend\src\middlewares",
  "real-time-chat-app\backend\src\models",
  "real-time-chat-app\backend\src\routes",
  "real-time-chat-app\backend\src\socket",
  "real-time-chat-app\backend\src\utils",
  "real-time-chat-app\frontend",
  "real-time-chat-app\frontend\public",
  "real-time-chat-app\frontend\src",
  "real-time-chat-app\frontend\src\api",
  "real-time-chat-app\frontend\src\assets",
  "real-time-chat-app\frontend\src\assets\images",
  "real-time-chat-app\frontend\src\components",
  "real-time-chat-app\frontend\src\components\common",
  "real-time-chat-app\frontend\src\components\layout",
  "real-time-chat-app\frontend\src\components\chat",
  "real-time-chat-app\frontend\src\constants",
  "real-time-chat-app\frontend\src\context",
  "real-time-chat-app\frontend\src\hooks",
  "real-time-chat-app\frontend\src\pages",
  "real-time-chat-app\frontend\src\routes",
  "real-time-chat-app\frontend\src\styles",
  "real-time-chat-app\frontend\src\utils"
)

# List of files to create (khaali), sirf agar maujood na hon
$files = @(
  "real-time-chat-app\backend\.env",
  "real-time-chat-app\backend\.env.example",
  "real-time-chat-app\backend\package.json",
  "real-time-chat-app\backend\package-lock.json",
  "real-time-chat-app\backend\src\config\db.js",
  "real-time-chat-app\backend\src\constants\index.js",
  "real-time-chat-app\backend\src\controllers\auth.controller.js",
  "real-time-chat-app\backend\src\controllers\message.controller.js",
  "real-time-chat-app\backend\src\controllers\user.controller.js",
  "real-time-chat-app\backend\src\middlewares\auth.middleware.js",
  "real-time-chat-app\backend\src\middlewares\error.middleware.js",
  "real-time-chat-app\backend\src\models\chat.model.js",
  "real-time-chat-app\backend\src\models\message.model.js",
  "real-time-chat-app\backend\src\models\user.model.js",
  "real-time-chat-app\backend\src\routes\auth.routes.js",
  "real-time-chat-app\backend\src\routes\message.routes.js",
  "real-time-chat-app\backend\src\routes\user.routes.js",
  "real-time-chat-app\backend\src\socket\socket.js",
  "real-time-chat-app\backend\src\utils\ApiError.js",
  "real-time-chat-app\backend\src\utils\ApiResponse.js",
  "real-time-chat-app\backend\src\utils\asyncHandler.js",
  "real-time-chat-app\backend\src\app.js",
  "real-time-chat-app\backend\server.js",
  "real-time-chat-app\frontend\package.json",
  "real-time-chat-app\frontend\package-lock.json",
  "real-time-chat-app\frontend\public\index.html",
  "real-time-chat-app\frontend\src\api\index.js",
  "real-time-chat-app\frontend\src\components\common\Button.jsx",
  "real-time-chat-app\frontend\src\components\common\Input.jsx",
  "real-time-chat-app\frontend\src\components\common\Spinner.jsx",
  "real-time-chat-app\frontend\src\components\layout\Navbar.jsx",
  "real-time-chat-app\frontend\src\components\layout\Sidebar.jsx",
  "real-time-chat-app\frontend\src\components\chat\ChatWindow.jsx",
  "real-time-chat-app\frontend\src\components\chat\Message.jsx",
  "real-time-chat-app\frontend\src\constants\index.js",
  "real-time-chat-app\frontend\src\context\AuthContext.jsx",
  "real-time-chat-app\frontend\src\context\SocketContext.jsx",
  "real-time-chat-app\frontend\src\hooks\useAuth.js",
  "real-time-chat-app\frontend\src\hooks\useSocket.js",
  "real-time-chat-app\frontend\src\pages\ChatPage.jsx",
  "real-time-chat-app\frontend\src\pages\LoginPage.jsx",
  "real-time-chat-app\frontend\src\pages\RegisterPage.jsx",
  "real-time-chat-app\frontend\src\routes\AppRoutes.jsx",
  "real-time-chat-app\frontend\src\styles\main.css",
  "real-time-chat-app\frontend\src\utils\index.js",
  "real-time-chat-app\frontend\src\App.jsx",
  "real-time-chat-app\frontend\src\index.js"
)

# Create directories if not existing
foreach ($d in $dirs) {
  if (-not (Test-Path $d -PathType Container)) {
    New-Item -ItemType Directory -Path $d | Out-Null
  }
}

# Create empty files if not existing
foreach ($f in $files) {
  if (-not (Test-Path $f -PathType Leaf)) {
    New-Item -ItemType File -Path $f | Out-Null
  }
}

Write-Host "`n✅ Folder structure 'real-time-chat-app' tayar ho gaya hai!" -ForegroundColor Green
