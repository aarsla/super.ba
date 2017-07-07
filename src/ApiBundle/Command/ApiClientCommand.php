<?php

namespace ApiBundle\Command;

use AppBundle\Apps\WebSocketApplication;
use Predis\Client;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\Session\SessionProvider;
use Ratchet\WebSocket\WsServer;
use Snc\RedisBundle\Session\Storage\Handler\RedisSessionHandler;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;

class ApiClientCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('fos:client:create')
            ->setDescription('Create FOSOauthServer client')
            //->addOption('port', 'p', InputOption::VALUE_REQUIRED, 'The port to listen on', 8080)
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $clientManager = $this->getContainer()->get('fos_oauth_server.client_manager.default');

        $client = $clientManager->createClient();
        $client->setRedirectUris(array('https://super.ba'));
        $client->setAllowedGrantTypes(array('token', 'authorization_code'));

        $clientManager->updateClient($client);

        $output->writeln(sprintf('Client created'));
    }
}