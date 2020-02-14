<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class BaseController extends Controller
{
    public function getBiHNumberOfArticles() {
        return $this->get('session')->get('_bih_article_no') ? $this->get('session')->get('_bih_article_no') : 3;
    }

    public function getNumberOfArticles() {
        return $this->get('session')->get('_article_no') ? $this->get('session')->get('_article_no') : 3;
    }

    public function getBiHSearchQuery() {
        return $this->get('session')->get('_pretraga') ? $this->get('session')->get('_pretraga') : '';
    }

    public function getSearchQuery() {
        return $this->get('session')->get('_search') ? $this->get('session')->get('_search') : '';
    }

    public function getBiHFilterDate() {
        return $this->get('session')->get('_datum') ? $this->get('session')->get('_datum') : null;
    }

    public function getFilterDate() {
        return $this->get('session')->get('_date') ? $this->get('session')->get('_date') : null;
    }
}
