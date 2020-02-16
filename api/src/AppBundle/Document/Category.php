<?php

namespace AppBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use JMS\Serializer\Annotation as JMS;

/**
 *  @ODM\Document
 */
class Category {

    /**
     * @ODM\Id
     * @JMS\Type("integer")
     */
    private $id;

    /**
     * @ODM\Field(type="string", name="title")
     * @JMS\Type("string")
     */
    public $title; //String

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }
}
