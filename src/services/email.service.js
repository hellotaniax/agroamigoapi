const nodemailer = require('nodemailer');

/**
 * Configuración del transportador de email
 */
const crearTransportador = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

/**
 * Envía un código de recuperación por email
 * @param {string} email - Email del destinatario
 * @param {string} codigo - Código de recuperación
 * @param {string} nombreUsuario - Nombre del usuario
 */
const enviarCodigoRecuperacion = async (email, codigo, nombreUsuario) => {
  try {
    const transporter = crearTransportador();

    const mailOptions = {
      from: `"AgroAmigo" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Código de recuperación de contraseña - AgroAmigo',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #4CAF50;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background-color: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 5px 5px;
            }
            .code {
              background-color: #fff;
              border: 2px dashed #4CAF50;
              padding: 20px;
              text-align: center;
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 5px;
              margin: 20px 0;
              color: #4CAF50;
            }
            .warning {
              background-color: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 10px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌱 AgroAmigo</h1>
            </div>
            <div class="content">
              <h2>Hola ${nombreUsuario},</h2>
              <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta.</p>
              
              <p>Tu código de recuperación es:</p>
              <div class="code">${codigo}</div>
              
              <div class="warning">
                ⚠️ <strong>Importante:</strong> Este código expirará en <strong>15 minutos</strong>.
              </div>
              
              <p>Si no solicitaste este cambio, puedes ignorar este correo. Tu contraseña permanecerá sin cambios.</p>
              
              <p>Saludos,<br>El equipo de AgroAmigo</p>
            </div>
            <div class="footer">
              <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado:', info.messageId);
    return true;

  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    throw error;
  }
};

module.exports = {
  enviarCodigoRecuperacion
};