export const messages = {
  validation: {
    invalidData: 'Dados de registro inválidos!',
    userAlreadyExists: 'Já existe um usuário cadastrado com este CPF ou E-mail',
    userAlreadyDeactivated: 'Este usuário está desativado',
    invalidCpf: 'CPF inválido!',
    invalidCRM: 'CRM inválido! Verifique o valor informado.',
    invalidJson: 'O corpo da requisição não está em formato JSON válido. Verifique a estrutura dos dados enviados.',
    invalidPhoneNumber: 'Número de telefone inválido!',
    invalidRole: 'Função de usuário (UserRole) inválida!',
    passwordTooShort: 'A senha deve ter pelo menos 8 caracteres.',
    passwordTooLong: 'A senha deve ter no máximo 64 caracteres.',
    passwordUppercase: 'A senha deve conter pelo menos uma letra maiúscula.',
    passwordLowercase: 'A senha deve conter pelo menos uma letra minúscula.',
    passwordDigit: 'A senha deve conter pelo menos um número.',
    passwordSpecial: 'A senha deve conter pelo menos um caractere especial.',
    passwordNoSpaces: 'A senha não pode conter espaços.',
  },
  errors: {
    internalServer: 'Erro interno do servidor!',
    invalidCredentials: 'Credenciais inválidas!',
    resourceNotFound: 'Recurso não encontrado!',
    supervisorDoctorNotFound: 'Usuário Supervisor Médico não encontrado!',
    forbidden: 'Acesso negado!',
    unauthorized: 'Não autorizado!',
    invalidToken: 'Token inválido ou expirado!',
    passwordChangeRequired: 'É necessário alterar a senha antes de acessar o sistema!',
    userCouldNotBeCreated: 'Não foi possível criar o usuário!',
    supervisorDoctorCouldNotBeCreated: 'Não foi possível criar o usuário Supervisor Médico!',
    userCouldNotBeUpdated: 'Não foi possível atualizar o usuário!',
    supervisorDoctorCouldNotBeUpdated: 'Não foi possível atualizar o usuário Supervisor Médico!',
  },
  info: {
    passwordResetGeneric: 'Se o usuário existir, você receberá um e-mail com instruções para redefinir a senha.',
  },
  email: {
    passwordRecoverySubject: 'Recuperação de senha',
  },
}

export type Messages = typeof messages
