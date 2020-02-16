<?php

namespace ApiBundle\Document;

use FOS\OAuthServerBundle\Document\Client as BaseClient;

class Client extends BaseClient
{
    protected $id;
    protected $name;

    public function __construct()
    {
        parent::__construct();
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

}