<?php

namespace AppBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use JMS\Serializer\Annotation as JMS;

/**
 *  @ODM\Document
 */
class Source {

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
     * @ODM\Field(type="string", name="url")
     * @JMS\Type("string")
     */
    public $url; //String

    /**
     * @ODM\Field(type="string", name="logo")
     * @JMS\Type("string")
     */
    public $logo; //String

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

    /**
     * @return mixed
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @param mixed $url
     */
    public function setUrl($url)
    {
        $this->url = $url;
    }

    /**
     * @return mixed
     */
    public function getLogo()
    {
        return $this->logo;
    }

    /**
     * @param mixed $logo
     */
    public function setLogo($logo)
    {
        $this->logo = $logo;
    }
}
