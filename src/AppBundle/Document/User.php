<?php

namespace AppBundle\Document;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @MongoDB\Document
 */
class User extends BaseUser implements UserInterface
{
    /**
     * @MongoDB\Id(strategy="auto")
     */
    protected $id;

    public function __construct()
    {
        parent::__construct();
        // your own logic
    }
}