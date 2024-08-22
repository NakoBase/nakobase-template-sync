import { select } from '@inquirer/prompts';

export const promptForAction = async (): Promise<string> => {
  const choices = [
    { name: 'Automated Release', value: 'automated-release' },
    { name: 'Github Templates', value: 'github-templates' },
    { name: 'commitlint', value: 'commitlint' },
    { name: 'Cancel', value: 'cancel' },
  ];

  return select({
    message: 'Which templates do you want to sync?',
    choices,
  });
};
